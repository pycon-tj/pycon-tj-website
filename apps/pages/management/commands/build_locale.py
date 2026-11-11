"""Build Russian and Tajik translation files without GNU gettext (works on Windows).

    python manage.py build_locale

1. Collects every {% translate %} string from templates and every _("...") in apps/.
2. Fills in drafts from locale/drafts.py.
3. Writes locale/<lang>/LC_MESSAGES/django.po and compiles django.mo.
Needs the dev dependency `polib`.
"""

import ast
import importlib.util
import re
from pathlib import Path
from typing import Any

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

TEMPLATE_RE = re.compile(r'{%\s*translate\s+"(.*?)"\s*%}')
TEMPLATE_DEFAULT_RE = re.compile(r'_\("(.*?)"\)')
PLURAL_FORMS = {
    "ru": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);",
    "tg": "nplurals=2; plural=(n != 1);",
}


def _python_strings(path: Path) -> set[str]:
    found: set[str] = set()
    tree = ast.parse(path.read_text(encoding="utf-8"))
    for node in ast.walk(tree):
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Name)
            and node.func.id in {"_", "gettext", "gettext_lazy"}
            and node.args
            and isinstance(node.args[0], ast.Constant)
            and isinstance(node.args[0].value, str)
        ):
            found.add(node.args[0].value)
    return found


class Command(BaseCommand):
    help = "Extract strings, merge draft translations and compile .mo files."

    def handle(self, *args: Any, **options: Any) -> None:
        try:
            import polib
        except ImportError as exc:
            raise CommandError("Install dev dependencies first: uv sync") from exc

        base = Path(settings.BASE_DIR)
        msgids: set[str] = set()
        for tpl in (base / "templates").rglob("*.html"):
            text = tpl.read_text(encoding="utf-8")
            msgids.update(TEMPLATE_RE.findall(text))
            msgids.update(TEMPLATE_DEFAULT_RE.findall(text))
        for py in (base / "apps").rglob("*.py"):
            if "migrations" not in py.parts:
                msgids.update(_python_strings(py))

        spec = importlib.util.spec_from_file_location("drafts", base / "locale" / "drafts.py")
        drafts = importlib.util.module_from_spec(spec)  # type: ignore[arg-type]
        spec.loader.exec_module(drafts)  # type: ignore[union-attr]

        for index, lang in enumerate(("ru", "tg")):
            po = polib.POFile()
            po.metadata = {
                "Content-Type": "text/plain; charset=UTF-8",
                "Language": lang,
                "Plural-Forms": PLURAL_FORMS[lang],
            }
            done = 0
            for msgid in sorted(msgids):
                translated = drafts.DRAFTS.get(msgid, ("", ""))[index]
                done += bool(translated)
                po.append(polib.POEntry(msgid=msgid, msgstr=translated))
            for (single, plural), forms in drafts.PLURALS.items():
                po.append(
                    polib.POEntry(
                        msgid=single,
                        msgid_plural=plural,
                        msgstr_plural=dict(enumerate(forms[index])),
                    )
                )
            out = base / "locale" / lang / "LC_MESSAGES"
            out.mkdir(parents=True, exist_ok=True)
            po.save(str(out / "django.po"))
            po.save_as_mofile(str(out / "django.mo"))
            self.stdout.write(f"{lang}: {done}/{len(msgids)} strings translated")

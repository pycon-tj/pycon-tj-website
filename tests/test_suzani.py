import xml.etree.ElementTree as ET

import suzani


def test_same_seed_same_pattern():
    assert suzani.rosette_svg("Ormon") == suzani.rosette_svg("Ormon")


def test_seed_ignores_case_and_spaces():
    assert suzani.design(" Dushanbe ").rings == suzani.design("dushanbe").rings


def test_different_seeds_differ():
    assert suzani.rosette_svg("Ali") != suzani.rosette_svg("Zarina")


def test_svg_is_valid_xml_and_escapes_text():
    svg = suzani.rosette_svg('<script>"x"</script>')
    root = ET.fromstring(svg)
    assert root.tag.endswith("svg")
    assert "<script>" not in svg


def test_tajik_letters_work_as_seed():
    ET.fromstring(suzani.rosette_svg("Ҷамшед Қурбонов"))


def test_border_is_valid_svg():
    ET.fromstring(suzani.border_svg("camp-1", 1600, 56))

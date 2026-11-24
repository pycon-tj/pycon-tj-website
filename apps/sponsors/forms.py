from django import forms
from django.utils.translation import gettext
from django.utils.translation import gettext_lazy as _

from .models import Inquiry


class InquiryForm(forms.ModelForm):
    class Meta:
        model = Inquiry
        fields = ["organization", "name", "email", "phone", "interest", "tier", "message"]
        widgets = {"interest": forms.RadioSelect, "message": forms.Textarea(attrs={"rows": 3})}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["tier"].empty_label = _("Not sure yet")
        self.fields["tier"].label_from_instance = lambda tier: gettext(tier.name)

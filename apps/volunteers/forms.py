from django import forms
from django.utils.translation import gettext_lazy as _

from .models import VolunteerApplication

Availability = VolunteerApplication.Availability


class VolunteerForm(forms.ModelForm):
    availability = forms.MultipleChoiceField(
        label=_("When can you help?"),
        choices=Availability.choices,
        widget=forms.CheckboxSelectMultiple,
    )

    class Meta:
        model = VolunteerApplication
        fields = ["name", "email", "phone", "role", "availability", "languages", "note"]
        widgets = {"role": forms.RadioSelect, "note": forms.Textarea(attrs={"rows": 3})}

    def clean_availability(self) -> str:
        return ",".join(self.cleaned_data["availability"])

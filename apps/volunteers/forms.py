from django import forms

from .models import VolunteerApplication


class VolunteerForm(forms.ModelForm):
    class Meta:
        model = VolunteerApplication
        fields = ["name", "email", "phone", "role", "languages", "note"]
        widgets = {"note": forms.Textarea(attrs={"rows": 3})}

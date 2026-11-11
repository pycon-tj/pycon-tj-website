from django import forms

from .models import AidApplication


class AidForm(forms.ModelForm):
    class Meta:
        model = AidApplication
        fields = ["name", "email", "city", "needs_ticket", "travel_estimate", "motivation"]
        widgets = {"motivation": forms.Textarea(attrs={"rows": 4})}

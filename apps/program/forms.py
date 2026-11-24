from django import forms

from .models import Proposal


class ProposalForm(forms.ModelForm):
    class Meta:
        model = Proposal
        fields = [
            "title",
            "format",
            "language",
            "level",
            "audience",
            "abstract",
            "outline",
            "name",
            "email",
            "phone",
            "bio",
            "first_time",
            "wants_mentor",
            "notes",
        ]
        widgets = {
            "abstract": forms.Textarea(attrs={"rows": 5}),
            "outline": forms.Textarea(attrs={"rows": 4}),
            "bio": forms.Textarea(attrs={"rows": 3}),
            "notes": forms.Textarea(attrs={"rows": 2}),
        }

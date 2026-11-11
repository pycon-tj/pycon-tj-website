import pytest

from apps.pages.scenes import SCENES, scene_svg


@pytest.mark.parametrize("name", sorted(SCENES))
def test_every_scene_has_landscape_and_portrait(name):
    svg = scene_svg(name)
    assert svg.count("<svg ") == 2
    assert 'viewBox="0 0 1600 900"' in svg
    assert 'viewBox="0 0 800 1400"' in svg


def test_scenes_are_deterministic():
    assert scene_svg("sunrise") == scene_svg("sunrise")


def test_clip_ids_do_not_collide_between_compositions():
    svg = scene_svg("sunrise")
    assert "sunrise-l-" in svg and "sunrise-p-" in svg

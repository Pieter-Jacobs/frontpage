from scripts.deploy import deploy_editorial
import pytest

@pytest.fixture()
def deploy_curriculum_vitae():
    editorial = deploy_editorial()
    return editorial

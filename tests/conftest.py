from scripts.deploy import deploy_editorial
import pytest

@pytest.fixture()
def deploy_editorial_fixture():
    editorial = deploy_editorial()
    return editorial

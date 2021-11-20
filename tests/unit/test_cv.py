from brownie import accounts 
import pytest

@pytest.mark.parametrize('deploy_certificate_fixture', ['Winner of BNAIC'], indirect=True)
def test_certificate_transfer(deploy_curriculum_vitae, deploy_certificate_fixture):
    # Arrange
    cv = deploy_curriculum_vitae
    certificate = deploy_certificate_fixture
    # Act
    cv.awardCertificate["address, address"](accounts[0], certificate)
    # Assert
    assert cv.certificatesOf(accounts[0]) == [certificate] 


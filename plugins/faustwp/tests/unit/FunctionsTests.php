<?php

namespace WPE\FaustWP\Tests\Unit;

use function WPE\FaustWP\Utilities\{strict_domain_match};

class FunctionsTests extends FaustUnitTest {
	public function testMatchValidDomainsWithPorts() {
		$this->assertTrue( strict_domain_match( 'https://example.com:443', 'https://example.com:443' ) );
		$this->assertTrue( strict_domain_match( 'https://www.example.org:443', 'https://example.org:443' ) );
	}

	public function testMatchWithoutPorts() {
		$this->assertTrue( strict_domain_match( 'https://example.com', 'https://example.com' ) );
		$this->assertTrue( strict_domain_match( 'http://www.example.org', 'http://example.org' ) );
	}

	public function testMatchDifferentPorts() {
		$this->assertFalse( strict_domain_match( 'https://example.com:443', 'https://example.com:80' ) );
		$this->assertFalse( strict_domain_match( 'http://example.com:8080', 'http://example.com:80' ) );
		$this->assertFalse( strict_domain_match( 'http://www.example.org:8080', 'http://example.org:80' ) );
	}

	public function testMatchDifferentProtocols() {
		$this->assertFalse( strict_domain_match( 'https://example.com', 'http://example.com' ) );
		$this->assertFalse( strict_domain_match( 'http://www.example.org', 'https://example.org' ) );
	}

	public function testSchemeMismatchSameDomainPort() {
		$this->assertFalse( strict_domain_match( 'http://example.com:80', 'https://example.com:80' ) );
	}
}
<?php

namespace WPE\FaustWP\Tests\Unit;

use function WPE\FaustWP\Utilities\{strict_domain_match};

class FunctionsTests extends FaustUnitTest {
	public function test_match_valid_domains_with_ports() {
		$this->assertTrue( strict_domain_match( 'https://example.com:443', 'https://example.com:443' ) );
		$this->assertTrue( strict_domain_match( 'http://example.com:80', 'http://example.com:80' ) );
		$this->assertTrue( strict_domain_match( 'https://www.example.org:443', 'https://example.org:443' ) ); // Different subdomains but same domain and port
	}

	public function test_match_without_ports() {
		$this->assertTrue( strict_domain_match( 'https://example.com', 'https://example.com' ) );
		$this->assertTrue( strict_domain_match( 'http://www.example.org', 'http://example.org' ) ); // Different subdomains
		$this->assertTrue( strict_domain_match( 'https://example.com', 'https://example.com' ) );
		$this->assertFalse( strict_domain_match( 'https://example.com', 'http://example.com' ) ); // Different schemes
	}

	public function test_match_different_ports() {
		$this->assertFalse( strict_domain_match( 'https://example.com:443', 'https://example.com:80' ) );
		$this->assertFalse( strict_domain_match( 'http://example.com:8080', 'http://example.com:80' ) );
		$this->assertFalse( strict_domain_match( 'http://www.example.org:8080', 'http://example.org:80' ) ); // Different ports
	}

	public function test_match_different_protocols() {
		$this->assertFalse( strict_domain_match( 'https://example.com', 'http://example.com' ) );
		$this->assertFalse( strict_domain_match( 'http://www.example.org', 'https://example.org' ) );
	}

	public function test_scheme_mismatch_same_domain_port() {
		$this->assertFalse( strict_domain_match( 'http://example.com:80', 'https://example.com:80' ) );
		$this->assertFalse( strict_domain_match( 'https://example.com:443', 'http://example.com:443' ) );
	}
}
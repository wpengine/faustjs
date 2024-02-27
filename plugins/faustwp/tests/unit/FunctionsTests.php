<?php

namespace WPE\FaustWP\Tests\Unit;

use function WPE\FaustWP\Utilities\{domains_match};

class FunctionsTests extends FaustUnitTest {
	public function test_domains_match() {
		// Test case 1: Same domains with different protocols
		$this->assertTrue(domains_match("http://example.com", "https://example.com"));

		// Test case 2: Same domains with trailing slashes
		$this->assertTrue(domains_match("http://example.com/", "http://example.com"));

		// Test case 3: Same domains with www prefix
		$this->assertTrue(domains_match("http://www.example.com", "http://example.com"));

		// Test case 4: Different domains
		$this->assertFalse(domains_match("http://example1.com", "http://example2.com"));

		// Test case 5: Same domains with different subdomains
		$this->assertFalse(domains_match("http://1.example.com", "http://2.example.com"));
	}
}

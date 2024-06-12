<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class test_luhne extends WebTestCase
{
    public function isValidCardNumber($number)
    {
        $sum = 0;
        $shouldDouble = false;

        for ($i = strlen($number) - 1; $i >= 0; $i--) {
            $digit = intval($number[$i]);
            if ($shouldDouble) {
                $digit *= 2;
                if ($digit > 9) {
                    $digit -= 9;
                }
            }
            $sum += $digit;
            $shouldDouble = !$shouldDouble;
        }

        return $sum % 10 === 0;
    }

    public function isValidCardNumberLength($number)
    {
        return strlen($number) === 16;
    }

    public function validateCardNumber($number)
    {
        if (!$this->isValidCardNumberLength($number)) {
            return [false, "La longueur du numéro de carte est incorrecte."];
        }

        if (!$this->isValidCardNumber($number)) {
            return [false, "Le numéro de carte est invalide."];
        }

        return [true, "C'est OK"];
    }

    public function testValidCardNumber(): void
    {
        list($isValid, $message) = $this->validateCardNumber('1234567812345670');
        $this->assertTrue($isValid, $message);
    }

    public function testInvalidCardNumber(): void
    {
        list($isValid, $message) = $this->validateCardNumber('1234567812345678');
        $this->assertFalse($isValid, $message);
    }

    public function testInvalidCardNumberLength(): void
    {
        list($isValid, $message) = $this->validateCardNumber('123456781234567');
        $this->assertFalse($isValid, $message);
    }
}

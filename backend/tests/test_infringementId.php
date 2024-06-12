<?php

namespace App\tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class test_infringementId extends WebTestCase
{
    function validateInfringementId($id)
    {
        $currentYear = date("Y");
        $regex = "/^[A-Z]{2}$currentYear" . "_[0-9]{1,2}_[0-9]{1,2}$/";

        if (!preg_match($regex, $id)) {
            return [false, "Le format du numéro de contravention est incorrect."];
        }

        preg_match("/([A-Z]{2})(\d{4})_(\d+)_(\d+)/", $id, $matches);
        list(, $letters, $year, $firstNumber, $secondNumber) = $matches;

        if ($letters[0] >= $letters[1]) {
            return [false, "La première lettre doit être avant la seconde dans l'alphabet."];
        }

        if (intval($firstNumber) + intval($secondNumber) !== 100) {
            return [false, "La somme des deux chiffres doit être égale à 100."];
        }

        return [true, "C'est ok"];
    }

    function validateIdTaxes($id)
    {
        return $this->validateInfringementId($id);
    }

    public function testAlgoIdTaxesSuccess(): void
    {
        list($isValid, $message) = $this->validateIdTaxes('KW2024_22_78');
        $this->assertTrue($isValid, $message);
    }

    public function testAlgoIdTaxesFailed(): void
    {
        list($isValid, $message) = $this->validateIdTaxes('ZX2023_22_78');
        $this->assertFalse($isValid, $message);
    }
}

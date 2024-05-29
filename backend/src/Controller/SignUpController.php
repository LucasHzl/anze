<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    public function __construct(
        EntityManagerInterface      $entityManager,
        UserPasswordHasherInterface $passwordHasher,
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }
    public function __invoke(Request $request): Response
    {
        // Décode la requête.
        $requestContent = json_decode($request->getContent(), true);
        // Si les clés "email" et "password" ne sont pas présentent dans la
        // requête renvoie une erreur.
        if (
            !array_key_exists('email', $requestContent) ||
            !array_key_exists(
                'password',
                $requestContent
            )
        ) {
            $message = 'Un problème technique est survenu, veuillez réessayer ultérieu
            return new Response($message, 500)';
        }
        $userFirstName = $requestContent['first_name'];
        $userLastName = $requestContent['last_name'];
        $userBirthdate = $requestContent['birthdate'];
        $userEmail = $requestContent['email'];
        $userPhone = $requestContent['phone'];
        $userAdress = $requestContent['adress'];
        $userCardNumber = $requestContent['card_number'];
        $userCryptogram = $requestContent['cryptogram'];
        $userExpirationDate = $requestContent['expiration_date'];
        $userPassword = $requestContent['password'];
        $userRoles = $requestContent['roles'];
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);
        // Si l'utilisateur est déjà enregistré renvoie une erreur.
        if ($registeredUser) {
            return new Response('Adresse email déjà enregistrée', 409);
        }
        // Hash le mot de passe de l'utilisateur et l'enregistre.
        $newUser = new User();
        $newUser->setEmail($userEmail);
        $newUser->setRoles($userRoles);
        $newUser->setFirstName($userFirstName);
        $newUser->setLastName($userLastName);
        $birthdate = new DateTime($userBirthdate);
        $newUser-> setBirthdate($birthdate);
        $newUser->setPhone($userPhone);
        $newUser->setAdress($userAdress);
        $newUser->setCardNumber($userCardNumber);
        $newUser->setCryptogram($userCryptogram);
        $expirationDate = new DateTime($userExpirationDate);
        $newUser->setExpirationDate($expirationDate);
        $newUser->setPassword(
            $this->passwordHasher->hashPassword($newUser, $userPassword)
        );
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();
        return new Response('OK', 200);
    }
}
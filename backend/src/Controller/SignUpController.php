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
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('email', $requestContent)) {
            $message = 'Un problème technique est survenu, veuillez réessayer ultérieurement
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
        $userRoles = $requestContent['roles'];
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);
        $newUser = new User();

        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
            $registeredUser = $this->getUser();
            $newUser = $registeredUser;
        } else {
            if ($registeredUser) {
                return new Response('Adresse email déjà enregistrée', 409);
            }
        $userPassword = $requestContent['password'];

            $newUser->setPassword(
                $this->passwordHasher->hashPassword($newUser, $userPassword)
            );
        }


        $newUser->setEmail($userEmail);
        $newUser->setRoles($userRoles);
        $newUser->setFirstName($userFirstName);
        $newUser->setLastName($userLastName);
        $birthdate = new DateTime($userBirthdate);
        $newUser->setBirthdate($birthdate);
        $newUser->setPhone($userPhone);
        $newUser->setAdress($userAdress);
        $newUser->setCardNumber($userCardNumber);
        $newUser->setCryptogram($userCryptogram);
        $expirationDate = new DateTime($userExpirationDate);
        $newUser->setExpirationDate($expirationDate);
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();
        return new Response('success', 200);
    }
}

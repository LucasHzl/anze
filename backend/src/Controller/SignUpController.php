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

        if (
            !array_key_exists('email', $requestContent) ||
            !array_key_exists(
                'password',
                $requestContent
            )
        ) {
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
        $userPassword = $requestContent['password'];
        $userRoles = $requestContent['roles'];
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);
        
        // if ($registeredUser) {
        //     return new Response('Adresse email déjà enregistrée', 409);
        // } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        //     $requestData = json_decode(file_get_contents('php://input'), true);
        //     if (isset($requestData['email']) && $requestData['email'] !== $registeredUser['email']) {
        //     } else {
        //         return new Response('Vous devez modifier votre adresse e-mail pour éditer votre profil', 400);
        //     }
        // }

        if ($registeredUser) {
            if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
                return new Response('ok');
            } else {
                return new Response('Adresse email déjà enregistrée', 409);
            }
        }
        
     
        

        $newUser = new User();
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
        $newUser->setPassword(
            $this->passwordHasher->hashPassword($newUser, $userPassword)
        );
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();
        return new Response('success', 200);
    }
}

<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ChangePasswordController extends AbstractController
{

    #[Route('/api/change_password', name: 'change_password', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function __invoke(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface, EntityManagerInterface $entityManagerInterface): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        if (
            !array_key_exists(
                'currentPassword', 
                $requestContent) ||
            !array_key_exists(
                'newPassword',
                $requestContent
            )
        ) {
            return new Response('Il manque un champs !', 402);
        }
        $user = $this->getUser();

        if (!$userPasswordHasherInterface->isPasswordValid($user, $requestContent['currentPassword'])) {
            return new Response('Il manque un champs !', 404);
        }

        $hashedNewPassword = $userPasswordHasherInterface->hashPassword($user, $requestContent['newPassword']);
        $user->setPassword($hashedNewPassword);
        $entityManagerInterface->flush();

        return new Response('Tout est ok', 200);
    }
}
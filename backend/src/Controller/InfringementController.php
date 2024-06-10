<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Infringement;
use App\Repository\InfringementRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class InfringementController extends AbstractController
{
    
    #[Route('/api/assign_user', name: 'assign_user', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function __invoke(Request $request, EntityManagerInterface $entityManagerInterface): Response
    {
        $requestContent = json_decode($request->getContent(), true);


        $id = $requestContent["id"];

        if (
            !array_key_exists(
                'id', 
                $requestContent)
        ) {
            return new Response('Il manque un champs !', 402);
        }
        $user = $this->getUser();


        $infringementRepository = $entityManagerInterface->getRepository(Infringement::class);


        $infringement = $infringementRepository->find($id);

        if (!$infringement) {
            return new Response('Trouve pas la contravention', 404);
        }

        if ($infringement->getUser() != null) {
            return new Response('Contravention déjà réglée', 208);
        }

        
        $infringement->setUser($user);

        $entityManagerInterface->flush();

        return new Response('Tout est ok', 200);
    }
    
}

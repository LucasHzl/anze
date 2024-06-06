<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;

use App\Controller\UserController;

use App\Controller\InfringementController;
use App\Repository\InfringementRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: InfringementRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            controller: InfringementController::class
        ),
        new GetCollection(),
] )]

#[ApiFilter(SearchFilter::class, properties: ['infringement_id' => 'exact',])]

class Infringement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    private ?string $title = null;

    #[ORM\Column(length: 128)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $amount = null;

    #[ORM\Column(length: 12)]
    private ?string $infringement_id = null;

    #[ORM\ManyToOne(inversedBy: 'relation_user_infringement')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getInfringementId(): ?string
    {
        return $this->infringement_id;
    }

    public function setInfringementId(string $infringement_id): static
    {
        $this->infringement_id = $infringement_id;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}

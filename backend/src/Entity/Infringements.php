<?php

namespace App\Entity;

use App\Repository\InfringementsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InfringementsRepository::class)]
class Infringements
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
    private ?float $amount = null;

    #[ORM\Column(length: 12)]
    private ?string $infringement_id = null;

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

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
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
}

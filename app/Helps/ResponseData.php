<?php

namespace App\Helps;

class ResponseData {
    protected $status;
    protected $message;
    protected $data;

    public static function create(): self {
       return new self();
    }

    public function setMessage(string $message): self {
        $this->message = $message;

        return $this;
    }

    public function setData(array $data) {
        $this->data = $data;

        return $this;
    }

    public function setStatus(bool $status)
    {
        $this->status = $status;

        return $this;
    }

    private function getMessage() : ?string
    {
        return $this->message ?? '';
    }

    private function getData(): array
    {
        return $this->data ?? [];
    }

    private function getStatus(): bool
    {
        return $this->status ?? false;
    }

    public function getBodyResponse(): array
    {
        return [
            'status' => $this->getStatus(),
            'message' => $this->getMessage(),
            'data' => $this->getData(),
        ];
    }
}

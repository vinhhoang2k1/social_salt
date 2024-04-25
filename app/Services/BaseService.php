<?php

namespace App\Services;

class BaseService {
    protected $repository;

    public function create(array $data) {
        return $this->repository->create($data);
    }

    public function find(int $id) {
        return $this->repository->find($id);
    }

    public function update(array $data, int $id) {
        return $this->repository->update($data, $id);
    }

    public function findWhere(array $whereData = [], array $select = ['*'], array $with = []) {
        return $this->repository->findWhere($whereData, $select, $with);
    }

    public function findFirst(array $where, $columns = ['*'], $with = []) {
        return $this->repository->findFirst($where, $columns, $with);
    }

    public function delete(int $id) {
        return $this->repository->delete($id);
    }

    public function firstOrCreate(array $data) {
        return $this->repository->firstOrCreate($data);
    }

    // public function changeStatus($id)
    // {
    //     $data = $this->repository->find($id);
    //     if ($data) {
    //         $status = $data->status;
    //         $new_status = ($status == config('constants.status_db.active')) ? config('constants.status_db.inactive') : config('constants.status_db.active');

    //         return $this->repository->update(['status' => $new_status], $id);
    //     }

    //     return false;
    // }

    public function datatable(array $where, array $select = ['*'], array $with = []) {
        return $this->repository->datatable($where, $select, $with);
    }

    public function all($column = ['*']) {
        return $this->repository->all($column);
    }

    public function getAll($column = ['*'], string $orderBy = 'DESC') {
        return $this->repository->orderBy('id', $orderBy)->all($column);
    }

}

<?php

namespace App\Repositories;

use App\Models\UserGroup;
use App\Models\User;

class UserGroupRepository
{

    protected $usergroup;
    protected $user;

    public function __construct(UserGroup $usergroup, User $user)
    {
        $this->usergroup = $usergroup;
        $this->user = $user;
    }

    public function index($query)
    {
        $usergroup = $query->get();
        return $usergroup;
    }
    public function create($attributes)
    {
        return $this->usergroup->create($attributes);
    }

    public function getSingleUsergroup($id)
    {
        $usergroup = $this->usergroup->where('id', $id)->first();
        return $usergroup;
    }
    public function getUserIdInGroup($query)
    {
        $userId = $query->user()->pluck("id")->first();
        return $userId;
    }

    public function getUsergroupsWithSpecifiedId($id = null)
    {
       if ($id) {
            $usergroupId = User::where("id", $id)->pluck("groupId")->first();
            $usergroups = UserGroup::doesnthave('user')->orWhere("id", $usergroupId)->get();
        } else {
            $usergroups = UserGroup::doesnthave('user')->get();
        }
        return $usergroups;
    }

    public function updateUserInUsergroup($userIds, $usergroupId)
    {
        $this->user->where("groupId", $usergroupId)->update([
            "groupId" => NULL
        ]);
        return $this->user->where("id", $userIds)->update([
            "groupId" => $usergroupId
        ]);
    }
    public function update($id, $attributes)
    {
        return $this->usergroup->where("id", $id)->update($attributes);
    }

    public function destroy($id)
    {
        $usergroup = $this->usergroup->find($id);
        return $usergroup->delete();
    }
    public function getUserAndUsergroupByQuery()
    {
        $query = $this->usergroup->query()->with(['usergroup' => function ($query) {
            $query->select('id', 'name');
        }]);
        return $query;
    }
    public function getUsergroupsBySearchQuery($query, $name, $description)
    {
        if ($name) {
            $query->where('name', 'like', '%' . $name . '%')->get();
        };
        if ($description) {
            $query->where('description', 'like', '%' . $description . '%')->get();
        }
        return $query;
    }

    public function getUsergroupsByOrderBy($query, $sort, $direction)
    {
        $query->orderBy($sort, $direction)->get();
        return $query;
    }
    public function sortUsergroup()
    {
        $query = $this->usergroup->orderBy('created_at', 'asc');
        return $query;
    }
}

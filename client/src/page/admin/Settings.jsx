import React from 'react'
import Header from '../../components/admin/Header'
import { NavLink, useParams } from 'react-router-dom'

import Account from "../../components/admin/Account"
import Security from "../../components/admin/Security"
import SurveyForm from "../../components/admin/SurveyForm"
import BackupRestore from "../../components/admin/BackupRestore"
import UserManagement from "../../components/admin/UserManagement"

const settingsNav = [
  {
    name: "Account",
    path: "/rbim/settings/account"
  },
  {
    name: "Security",
    path: "/rbim/settings/security"
  },
  {
    name: "Manage Survey Form",
    path: "/rbim/settings/manage-survey-form"
  },
  {
    name: "Backup/Restore",
    path: "/rbim/settings/backup-restore"
  },
  {
    name: "User Management",
    path: "/rbim/settings/manage-user"
  },
];

const Settings = () => {
  const path = useParams().path;
  const activePath = path === undefined ? 'account' : path;

  const SelectedSettings = () => {
    let desc = '';
    switch (activePath) {
      case 'account':
        desc = "Update and manage your profile information"
        return <Account title={"Account"} description={desc}/>;
      case 'security':
        desc = "Enhance and manage your password security"
        return <Security title={"Security"} description={desc} />;
      case 'manage-survey-form':
        desc = "Effortlessly handle survey questions and responses"
        return <SurveyForm title={"Manage Survey Form"} description={desc} />;
      case 'backup-restore':
        desc = "Safeguard and restore critical system data"
        return <BackupRestore title={"Backup/Restore"} description={desc} />;
      case 'manage-user':
        desc = "Efficiently oversee and manage user information"
        return <UserManagement title={"User Management"} description={desc} />;
    }
  }

  return (
    <>
      <Header pageName={"Settings"} />
      <div className="content">
        <div className='flex flex-col md:flex-row gap-6 h-full'>
          <nav className='basis-2/5 md:basis-1/4'>
            <ul className='flex flex-row md:flex-col md:fixed whitespace-nowrap overflow-auto border sm:border-0 rounded-md'>
              {
                settingsNav?.map((link, idx) => (
                  <li key={idx}>
                    <NavLink to={link.path} className="text-sm grid gap-1 p-2 rounded-md bg-transparent hover:bg-gray-100">
                      <span className='text-md font-semibold'>{link.name}</span>
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </nav>
          <div className='w-full'>
            <SelectedSettings />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
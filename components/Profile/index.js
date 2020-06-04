import React from 'react'
import Title from '../Title'
import Description from '../Description'
import Avatar from '../Avatar'
import Repositories from '../Repositories'


function Profile({ user, userEmails, repos }) {
    return (
        <div className="container mx-auto my-12">
            <div className="flex flex-col mb-4 xl:flex-row">
                <div className="xl:w-1/4 lg:w-full md:w-full sm:w-full">
                    <div className="p-10 bg-white rounded-lg shadow">
                        {
                            user.avatar_url && <Avatar url={user.avatar_url} />
                        }
                        <Title text={user.name} />
                        <Description text={user.bio} />
                        {
                            !!userEmails.length && <h3 className="pt-10 text-center text-xl xl:text-left md:text-center">Private Emails</h3>
                        }
                        <ul>
                            {userEmails.map((e) => <li className="text-center xl:text-left md:text-center" key={e.email}>{e.email}</li>)}
                        </ul>
                        <div className="text-center xl:text-left md:text-center sm:text-center pt-4">
                            <a className="text-black-500 font-bold" rel="noreferrer" target="_blank" href={user.html_url}>Visitar o perfil no Github</a>
                        </div>
                    </div>
                </div>
                <div className="xl:w-1/4 lg:w-full md:w-full sm:w-full flex-1 w-1/2 px-0 bg-gray-100 mt-5 sm:px-0 md:px-0 lg:px-0 xl:px-10 sm:mt-5 xl:mt-0 sm:mt-5 lg:mt-5 md:mt-5">
                    <div className="grid flex-wrap xl:grid-cols-2 md:grid-cols-2 gap-4">
                        {
                            repos.map((rep) => (
                                <Repositories
                                    key={rep.id}
                                    name={rep.name}
                                    description={rep.description}
                                    url={rep.html_url}
                                    login={rep.owner.login}
                                    language={rep.language}
                                    stars={rep.stargazers_count}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

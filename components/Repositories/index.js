import React from 'react'

function Repositories({
    url, name, description, login, language, stars,
}) {
    return (
        <a target="_blank" rel="noreferrer" href={url} className="p-6 bg-white rounded-lg shadow flex flex-col justify-between">
            <div className="pb-10">
                <p className="text-2xl font-bold pb-2">{name}</p>
                <p>{description || 'No description'}</p>
            </div>
            <div className="flex justify-between">
                <p>{login}</p>
                <p>{language}</p>
                <p>{stars}</p>
            </div>
        </a>
    )
}

export default Repositories

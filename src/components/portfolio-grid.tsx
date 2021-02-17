import * as React from 'react'

export default () => {

    function renderCard(title?: string, url?: string) {
        return (
            <div className={`flex flex-col`}>
                <img className={`object-cover`} src={url} />
                <div className={`flex items-center justify-between py-2`}>
                    <span className={`text-sm text-black dark:text-gray-400`}>
                        {title}
                    </span>
                    <div className={`flex items-center space-x-3`}>
                        {/* <img src={`http://placehold.it/20x20`} />
                        <img src={`http://placehold.it/20x20`} /> */}
                    </div>
                </div>
              
            </div>
        )
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pb-24`}>
            { renderCard('Warrior Academy (Desktop)', 'warrior-academy-mockup.png') }
            { renderCard('MyFinancial', 'my-financial-mockup.png') }
            { renderCard('The Opendoor', 'opendoor-mockup.png') }
            { renderCard('Warrior Academy – Learning Platform', 'warrior-academy-learning-mockup.png') }
            { renderCard() }
            { renderCard() }
            { renderCard() }
            { renderCard() }
            { renderCard() }
        </div>
    )
}
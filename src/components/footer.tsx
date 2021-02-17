import * as React from 'react'

export default () => (
    <footer className={`flex flex-col bg-blue-50`}>
        <div className={`border-b border-blue-200 flex flex-col items-center py-16`}>
            <div className={`text-center text-4xl flex flex-col leading-relaxed mb-8`}>
                <span>Lets work together.</span>
                <span>BrianRabil@gmail.com</span>
            </div>
            <img src={`http://placehold.it/100x50`} />
        </div>
        <div className={`py-4 px-4 sm:px-6 lg:px-8 text-gray-500`}>
            © {new Date().getFullYear()} <a href="https://www.brianrabil.com">Brian Rabil</a>
        </div>

    </footer>
)
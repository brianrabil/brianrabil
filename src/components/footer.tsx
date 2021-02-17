import * as React from 'react'

export default () => (
    <footer className={`flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500`}>
        <div className={`flex flex-col items-center py-16`}>
            <div className={`text-center text-4xl flex flex-col leading-relaxed mb-8 text-white`}>
                <span className={`font-black`}>Lets work together.</span>
                <span className={`text-3xl`}>BrianRabil@gmail.com</span>
            </div>
            <span className={`text-5xl`}>🚀</span>
            
        </div>
        <div className={`text-sm py-4 px-4 sm:px-6 lg:px-8 text-purple-200`}>
            © {new Date().getFullYear()} <a href="https://www.brianrabil.com">Brian Rabil</a>
        </div>

    </footer>
)
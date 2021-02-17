import * as React from 'react'

interface Props {
    children?: React.ReactNode;
}

export default ({ children }: Props) => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
    </div>
)
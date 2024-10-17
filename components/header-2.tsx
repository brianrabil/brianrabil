import Image from "next/image";

export function Header() {
	return (
		<header className="bg-white py-8">
			<div className="container mx-auto flex justify-between items-center">
				{/* Left section: Logo and Navigation */}
				<div className="flex items-center space-x-8">
					<div className="text-2xl font-bold text-gray-900">
						{/* Logo Placeholder */}
						<span className="text-3xl">JANE</span>
					</div>

					<nav className="space-x-6 hidden md:flex">
						<a href="/" className="text-gray-700 hover:text-gray-900">
							Home
						</a>
						<a href="/about" className="text-gray-700 hover:text-gray-900">
							About
						</a>
						<a href="/works" className="text-gray-700 hover:text-gray-900">
							Work
						</a>
						<a href="/blog" className="text-gray-700 hover:text-gray-900">
							Blog
						</a>
						<a href="/contact" className="text-gray-700 hover:text-gray-900">
							Contact
						</a>
					</nav>
				</div>

				{/* Right section: Call to Action */}
				<div>
					<button
						type="button"
						className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
					>
						Book a call
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
				{/* Text Section */}
				<div className="space-y-6">
					<h1 className="text-4xl font-extrabold text-gray-900">
						Helping businesses turn their ideas into reality
					</h1>
					<p className="text-gray-700">
						I’m a passionate developer, entrepreneur, and general technology
						enthusiast living in San Francisco. I’ve worked with hundreds of
						startups to help them develop their ideas into profitable
						businesses.
					</p>
					<button
						type="button"
						className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
					>
						Book a call with me
					</button>

					<div className="flex space-x-4">
						{/* Social Media Icons */}
						<a href="#" className="text-gray-700 hover:text-black">
							{/* Icon Placeholder */}
							<i className="fab fa-twitter" />
						</a>
						<a href="#" className="text-gray-700 hover:text-black">
							<i className="fab fa-instagram" />
						</a>
						<a href="#" className="text-gray-700 hover:text-black">
							<i className="fab fa-linkedin" />
						</a>
					</div>
				</div>

				{/* Image Section */}
				<div className="relative">
					{/* Replace with your Next.js Image */}
					<Image
						src="/path-to-your-image.jpg" // Replace with actual image path
						alt="Jane's profile image"
						width={500}
						height={500}
						className="rounded-lg"
					/>
					<span className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg text-sm text-gray-700">
						4 years of experience
					</span>
				</div>
			</div>
		</header>
	);
}

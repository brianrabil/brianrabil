import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Image from "./image"

export default () => {
//   function renderPhotoViewer() {
//     return (
//       <div className={`fixed inset-0 z-50 hidden md:block`}>
//         <div className={`relative h-full w-full`}>
//           <div className={`absolute inset-0 z-30`}>
//             <div
//               className={`h-16 border-b border-gray-600 flex items-center justify-between px-4`}
//             >
//               <span className={`text-lg text-white`}>
//                 {portfolioItems[viewingImage].title}
//               </span>
//               <button
//                 onClick={() => setViewingImage(null)}
//                 className={`text-white hover:text-red-500 transition duration-200 ease-in-out p-3`}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   ></path>
//                 </svg>
//               </button>
//             </div>

//             <div
//               className={`h-full w-full flex`}
//               style={{ height: "calc(100vh - 64px)" }}
//             >
//               <button
//                 onClick={onPrevImage}
//                 className={`h-full w-24 text-white hover:bg-gray-800 transition duration-150 ease-in-out flex items-center justify-center`}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 19l-7-7 7-7"
//                   ></path>
//                 </svg>
//               </button>
//               <div
//                 className={`h-full w-full p-10 flex items-center justify-center`}
//               >
//                 <img
//                   className={`object-contain h-full w-auto rounded-xl`}
//                   src={portfolioItems[viewingImage].path}
//                 />
//               </div>
//               <button
//                 onClick={onNextImage}
//                 className={`h-full w-24 text-white hover:bg-gray-800 transition duration-150 ease-in-out flex items-center justify-center`}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5l7 7-7 7"
//                   ></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <div
//             className={`bg-gray-900 h-full w-full opacity-100 absolute inset-0 z-20`}
//           ></div>
//         </div>
//       </div>
//     )
//   }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pb-24`}>
      <Image
        title="Warrior Academy"
        image={
          <StaticImage
            src="../images/warrior-academy-mockup.png"
            alt="Warrior Academy"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
      <Image
        title="My Financial"
        image={
          <StaticImage
            src="../images/my-financial-mockup.png"
            alt="My Financial"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
      <Image
        title="Warrior Academy Course Platform"
        image={
          <StaticImage
            src="../images/warrior-academy-learning-mockup.png"
            alt="Warrior Academy Course Platform"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
      <Image
        title="Synthetic Analyst"
        image={
          <StaticImage
            src="../images/sa-module-builder-mockup.png"
            alt="Synthetic Analyst"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
      <Image
        title="Compeat"
        image={
          <StaticImage
            src="../images/compeat-mockup.png"
            alt="Compeat"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
      <Image
        title="CAP Map"
        image={
          <StaticImage
            src="../images/cap-map-mockup.png"
            alt="CAP Map"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
      <Image
        title="GMARS Logo"
        image={
          <StaticImage
            src="../images/gmars-logo.png"
            alt="GMARS Logo"
            layout="fullWidth"
            placeholder="blurred"
            loading="lazy"
          />
        }
      />
    </div>
  )
}

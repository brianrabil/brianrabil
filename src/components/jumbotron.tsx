import React from 'react';

export default () => {
    return (
        <div className="section-standard">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <div className="nav-toggler d-none d-lg-block">
                                <div className="menu-btn">
                                    <div className="line-menu half start"></div>
                                    <div className="line-menu"></div>
                                    <div className="line-menu half end"></div>
                                </div>
                            
                            </div>
                
                            <div className="g-title">
                                <h4><span>Grit</span> William</h4>
                                <p className="mb-25">A freelance UI/UX designer and Front-end developer,<br/>Based in San Francisco</p>
                                <a href="#" className="g-link slide-vertical" data-splitting>Get Résumé</a>
                            </div>
                    
                        </div>
                        <div className="social-links d-block d-lg-none mt-30">
                            <a href="#" className="slide-horizontal" data-splitting>Facebook</a>
                            <a href="#" className="slide-horizontal" data-splitting>Twitter</a>
                            <a href="#" className="slide-horizontal" data-splitting>Dribbble</a>
                        </div>
                
                    </div>
                    <div className="col-lg-3 col-md-12 d-none d-lg-block">
                        <div className="standard-text-holder">
                            <h5 className="mb-25">Let's work together</h5>
                            <p className="mb-10">I’m available at</p>
                            <p className="mb-1"><a href="mailto:hello@grit.com" className="slide-vertical colored" data-splitting>hello@grit.com</a></p>
                            <p><a href="tel:(+47) 469 23 236" className="slide-vertical" data-splitting>(+38) 469 23 236</a></p>
                        </div>
                    
                        <div className="social-links mt-20">
                            <a href="#" className="slide-horizontal" data-splitting>Facebook</a>
                            <a href="#" className="slide-horizontal" data-splitting>Twitter</a>
                            <a href="#" className="slide-horizontal" data-splitting>Dribbble</a>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    )
}
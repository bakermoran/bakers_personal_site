import { icon } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/bakermoran",
    svg: icon(faGithub).html[0],
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/baker-moran-a47b17114/",
    svg: icon(faLinkedin).html[0],
  },
  {
    name: "Email",
    url: "mailto:bamoran99@gmail.com",
    svg: icon(faEnvelope).html[0],
  },
];

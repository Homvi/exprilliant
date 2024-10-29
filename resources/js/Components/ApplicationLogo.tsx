import applogo from '../../assets/exprilliant.png';

interface ApplicationLogoProps {
  className?: string;
}

const ApplicationLogo = (props: ApplicationLogoProps) => {
  return <img className={`w-16 ${props.className}`} src={applogo} alt="Application Logo" />;
};

export default ApplicationLogo;

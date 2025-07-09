import Image from "next/image";
import Link from "next/link";

const ServicePromotion = () => {
  return (
    <div className="service-promotion rounded">
      <h2 className="!mt-0">Need Experts Help To Build Your Hugo Website?</h2>
      <p>
        We have over 5 years of experience in the Hugo industry and successfully
        completed 90+ client projects. Send us your requirements & let our team
        take care of everything else!
      </p>
      <Link
        href="https://gethugothemes.com/services?utm_source=tf_blog_post&utm_medium=tf_services_banner&utm_campaign=tf_services_promotion"
        button="true"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary service-promotion-blog"
      >
        Hire Us
      </Link>
      <Image
        src="/images/promo-bg.png"
        alt="Buy Custom Service"
        height="324"
        width="300"
      />
    </div>
  );
};

export default ServicePromotion;

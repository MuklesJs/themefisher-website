import Script from "next/script";

const ProductSchema = ({
  title,
  image,
  slug,
  description,
  date,
  price,
  type,
}) => (
  <Script
    strategy="beforeInteractive"
    type="application/ld+json"
    id="schema-script"
    dangerouslySetInnerHTML={{
      __html: `
      {
        "@context": "https://schema.org/", 
        "@type": "Product", 
        "name": "${title}",
        "image": "${image}",
        "url": "https://themefisher.com/products/${slug}",  
        "description": "${description}",
        "brand": {
          "@type": "Brand",
          "name": "Themefisher"
        },
        "releaseDate": "${date}",
        "offers": {
          "@type": "Offer",
          "price": "${price}",  
          "priceCurrency": "USD"  
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Product Type",
            "value": "${type}"
          },
          {
            "@type": "PropertyValue",
            "name": "Theme Demo",
            "value": "https://themefisher.com/demo?theme=${slug}"
          }
        ]
      }
      `,
    }}
  />
);

export default ProductSchema;

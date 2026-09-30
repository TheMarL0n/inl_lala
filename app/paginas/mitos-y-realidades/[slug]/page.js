import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Mitos from "@/app/components/Home/Mitos";
import BuscadorMitos from "@/app/components/Mitos/BuscadorMitos";
import MitosNavegacion from "@/app/components/Mitos/MitosNavegacion";
import ReferenciasMitos from "@/app/components/Mitos/ReferenciasMitos";
import SingleMitoMain from "@/app/components/Mitos/SingleMitoMain";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import { mitos } from "@/app/utils/Copies";

export async function generateMetadata({ params }) {
    const resolvedParams = await params;

    const currentMito = mitos.find(
        (mito) => mito.slug === resolvedParams.slug
    );

    if (!currentMito) {
        return {
            title: "Página no encontrada | Lala",
            description: "Desmintiendo los mitos que existen sobre los Lácteos.",
        };
    }

    const baseUrl = "https://www.institutolala.com.mx";

    return {
        title: currentMito.titulo || "Mitos y realidades | Lala",
        description: "Desmintiendo los mitos que existen sobre los Lácteos.",
        alternates: {
            canonical: `${baseUrl}/paginas/mitos-y-realidades/${resolvedParams.slug}`,
        },
        openGraph: {
            title: currentMito.titulo,
            description: "Desmintiendo los mitos que existen sobre los Lácteos.",
            url: `${baseUrl}/paginas/mitos-y-realidades/${resolvedParams.slug}`,
            siteName: "Instituto de Nutrición Lala",
            images: [
                {
                    url: currentMito.imagen_principal,
                }
            ],
            type: "article",
            publishedTime: currentMito.date,
            authors: [currentMito.author],
        },
    };
}

const Mito_Realidad = async ({ params }) => {
    const resolvedParams = await params;
    const currentMito = mitos.find(
        (mito) => mito.slug === resolvedParams.slug
    );

    const title = currentMito ? currentMito.titulo : "";
    const reality = currentMito ? currentMito.realidad : "";
    const main_image = currentMito ? currentMito.imagen_principal : "";
    const date = currentMito ? currentMito.date : "";
    const author = currentMito ? currentMito.author : "";
    const background = "/images/mitos/mitos_bkg.png";
    const baseUrl = "https://www.institutolala.com.mx";
    const currentUrl = `${baseUrl}/paginas/mitos-y-realidades/${resolvedParams.slug}`;

    // Schema de Artículo (Mito)
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "ClaimReview",
        "datePublished": date,
        "url": currentUrl,
        "claimReviewed": title,
        "author": {
            "@type": "Organization",
            "name": author || "Instituto de Nutrición Lala"
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "1", // 1 suele indicar falso / mito desmentido en escalas personalizadas
            "bestRating": "5",
            "worstRating": "1",
            "alternateName": "Falso / Mito"
        },
        "itemReviewed": {
            "@type": "Claim",
            "appearance": {
                "@type": "CreativeWork",
                "url": currentUrl
            },
            "author": {
                "@type": "Organization",
                "name": "Creencia popular"
            },
            "datePublished": date || "2026",
            "name": title
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Mitos y Realidades",
                "item": `${baseUrl}/paginas/mitos-y-realidades`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": currentUrl
            }
        ]
    };

    return (
        <main>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <Header />
            <article>
                <PagesSmallJumbotron background={background} />
                <SingleMitoMain image={main_image} title={title} reality={reality} />
            </article>
            <Mitos alternative={true} currentSlug={currentMito.slug}/>
            <BuscadorMitos />
            <ReferenciasMitos />
            <MitosNavegacion currentTheme={currentMito} />
            <Footer />
        </main>
    )
}
export default Mito_Realidad
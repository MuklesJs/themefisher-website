import { useDownloadContext } from "@/context/useDownloadContext";
import Axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import router from "next/router";

const useDownloadedProducts = () => {
  const { downloadState } = useDownloadContext();
  const { data: session } = useSession();

  const downloads = downloadState?.downloads?.products?.map((d) => d.slug);

  // handle download function
  const handleDownload = async (slug, download) => {
    const res = await Axios.post(
      `download-history`,
      {
        user_id: session.user.id,
        products: [
          {
            slug: slug,
            downloads: [
              {
                date: new Date().toISOString().slice(0, 10),
              },
            ],
          },
        ],
      },
      {
        headers: {
          authorization: `Bearer ${session?.user?.accessToken}`,
        },
      },
    );
    if (res.status === 200) {
      router.push(download);
    }
  };

  return {
    downloadedProducts: downloads,
    handleDownload,
  };
};

export default useDownloadedProducts;

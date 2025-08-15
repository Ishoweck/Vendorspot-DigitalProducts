"use client";

import { useEffect } from "react";
import { useQueryClient } from "react-query";
import SocketService from "@/lib/socket";

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    SocketService.connect();

    const handleProductViewed = (data: {
      productId: string;
      viewCount: number;
    }) => {
      queryClient.setQueryData(["product", data.productId], (oldData: any) => {
        if (oldData?.data?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: {
                ...oldData.data.data,
                viewCount: data.viewCount,
              },
            },
          };
        }
        return oldData;
      });

      queryClient.setQueryData(["vendor-products"], (oldData: any) => {
        if (oldData?.data?.data) {
          const updatedProducts = oldData.data.data.map((product: any) =>
            product._id === data.productId
              ? { ...product, viewCount: data.viewCount }
              : product
          );
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: updatedProducts,
            },
          };
        }
        return oldData;
      });

      queryClient.setQueryData(["products"], (oldData: any) => {
        if (oldData?.data?.data) {
          const updatedProducts = oldData.data.data.map((product: any) =>
            product._id === data.productId
              ? { ...product, viewCount: data.viewCount }
              : product
          );
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: updatedProducts,
            },
          };
        }
        return oldData;
      });
    };

    const handleProductCreated = () => {
      queryClient.invalidateQueries(["vendor-products"]);
      queryClient.invalidateQueries(["products"]);
    };

    const handleProductUpdated = () => {
      queryClient.invalidateQueries(["vendor-products"]);
      queryClient.invalidateQueries(["products"]);
    };

    const handleProductDeleted = () => {
      queryClient.invalidateQueries(["vendor-products"]);
      queryClient.invalidateQueries(["products"]);
    };

    SocketService.on("product:viewed", handleProductViewed);
    SocketService.on("product:created", handleProductCreated);
    SocketService.on("product:updated", handleProductUpdated);
    SocketService.on("product:deleted", handleProductDeleted);

    return () => {
      SocketService.off("product:viewed", handleProductViewed);
      SocketService.off("product:created", handleProductCreated);
      SocketService.off("product:updated", handleProductUpdated);
      SocketService.off("product:deleted", handleProductDeleted);
    };
  }, [queryClient]);

  return SocketService;
};

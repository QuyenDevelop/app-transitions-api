import express from "express";
import {
  createServicedApartment,
  deleteAll,
  deleteServicedApartment,
  getAllServicedApartment,
  getDetailServicedApartment,
  updateServicedApartment,
} from "../modules/ServicedApartment.module";
import { Helpers } from "../utils";

const ServiceHouseController = {
  // ----- create
  create: async (req: express.Request, res: express.Response) => {
    try {
      const { name, address, managerId, owner, prices, description } = req.body;
      const servicedHouse = await createServicedApartment({
        sa_name: name,
        address: address,
        owner: owner,
        manager: managerId,
        prices: prices || 0,
        description: description || null,
      });
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: servicedHouse,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  // ----- read
  getListServiceHouse: async (_req: express.Request, res: express.Response) => {
    try {
      const serviceHouse = await getAllServicedApartment();
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: serviceHouse,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  getDetailServiceHouse: async (
    req: express.Request,
    res: express.Response
  ) => {
    const { id } = req.body;
    try {
      const serviceHouse = await getDetailServicedApartment(id);
      if (!serviceHouse) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: serviceHouse,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
        data: null,
      });
    }
  },

  // ----- update
  updateServiceHouseById: async (
    req: express.Request,
    res: express.Response
  ) => {
    const { id, name, address, prices, description } = req.body;

    try {
      const serviceHouse = await getDetailServicedApartment(id);
      if (!serviceHouse) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      const newServiceHouse = await updateServicedApartment(id, {
        sa_name: name,
        address: address,
        prices: prices,
        description: description,
      });
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: newServiceHouse,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
        data: null,
      });
    }
  },
  updateStatusServiceHouse: async (
    req: express.Request,
    res: express.Response
  ) => {
    const { id, status } = req.body;
    try {
      const serviceHouse = await getDetailServicedApartment(id);
      if (!serviceHouse) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      const newServiceHouse = await updateServicedApartment(id, {
        status: status,
      });
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: newServiceHouse,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
        data: null,
      });
    }
  },
  updateManageServiceHouse: async (
    req: express.Request,
    res: express.Response
  ) => {
    const { id, owner } = req.body;
    try {
      const serviceHouse = await getDetailServicedApartment(id);
      if (!serviceHouse) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      const newServiceHouse = await updateServicedApartment(id, {
        owner: owner,
      });
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: newServiceHouse,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
        data: null,
      });
    }
  },

  // ----- delete
  deleteById: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.body;
      const serviceHouse = await getDetailServicedApartment(id);
      if (!serviceHouse) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      await deleteServicedApartment(id);
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: null,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  deleteAll: async (_req: express.Request, res: express.Response) => {
    try {
      await deleteAll();
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: null,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
};
export default ServiceHouseController;

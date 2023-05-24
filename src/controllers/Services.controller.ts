import express from "express";
import { createServices, getAllServices, updateServices } from "../database";

const ServicesController = {
  createService: async (req: express.Request, res: express.Response) => {
    try {
      const { service_id, service_name, unit, prices, description } = req.body;
      const service = await createServices({
        service_id,
        service_name,
        unit: unit || "",
        prices: prices || 0,
        description: description || null,
      });
      return res
        .json({
          status: "success",
          status_code: 200,
          errorMessage: "",
          data: service,
        })
        .end();
    } catch (error) {
      return res.status(400).json({
        status: "false",
        errorMessage: "",
        data: null,
      });
    }
  },
  updateService: async (req: express.Request, res: express.Response) => {
    try {
      const { service_id, service_name, unit, prices, description } = req.body;
      const service = await updateServices(service_id, {
        service_name,
        unit: unit || "",
        prices: prices || 0,
        description: description || null,
      });
      return res
        .json({
          status: "success",
          status_code: 200,
          errorMessage: "",
          data: service,
        })
        .end();
    } catch (error) {
      return res.status(400).json({
        status: "false",
        errorMessage: "Internal Server Error!",
        data: null,
      });
    }
  },
  getAllServices: async (_req: express.Request, res: express.Response) => {
    try {
      const services = await getAllServices();
      return res.status(200).json({
        status: "success",
        errorMessage: "",
        data: services,
      });
    } catch (error) {
      return res.status(400).json({
        status: "false",
        errorMessage: "Internal Server Error!",
        data: null,
      });
    }
  },
};

export default ServicesController;

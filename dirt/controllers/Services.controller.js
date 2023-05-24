"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules");
const ServicesController = {
    createService: async (req, res) => {
        try {
            const { service_id, service_name, unit, prices, description } = req.body;
            const service = await (0, modules_1.createServices)({
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
        }
        catch (error) {
            return res.status(400).json({
                status: "false",
                errorMessage: "",
                data: null,
            });
        }
    },
    updateService: async (req, res) => {
        try {
            const { service_id, service_name, unit, prices, description } = req.body;
            const service = await (0, modules_1.updateServices)(service_id, {
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
        }
        catch (error) {
            return res.status(400).json({
                status: "false",
                errorMessage: "Internal Server Error!",
                data: null,
            });
        }
    },
    getAllServices: async (_req, res) => {
        try {
            const services = await (0, modules_1.getAllServices)();
            return res.status(200).json({
                status: "success",
                errorMessage: "",
                data: services,
            });
        }
        catch (error) {
            return res.status(400).json({
                status: "false",
                errorMessage: "Internal Server Error!",
                data: null,
            });
        }
    },
};
exports.default = ServicesController;
//# sourceMappingURL=Services.controller.js.map
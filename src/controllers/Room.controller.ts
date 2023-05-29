import express from "express";
import {
  createRoom,
  deleteAllRoom,
  deleteRoom,
  getDetailRoom,
  getListRoom,
  getListRoomByHouseId,
  updateRoom,
} from "../modules/Room.module";
import { Helpers } from "../utils";

const RoomController = {
  // ----- create
  create: async (req: express.Request, res: express.Response) => {
    try {
      const { name, houseId, type, prices, description } = req.body;
      const servicedHouse = await createRoom({
        sa_id: houseId,
        room_name: name,
        type: type,
        prices: prices,
        description: description,
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
  getListAll: async (_req: express.Request, res: express.Response) => {
    try {
      const data = await getListRoom();
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: data,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  getListRoomByHouseId: async (req: express.Request, res: express.Response) => {
    try {
      const { houseId } = req.body;
      const data = await getListRoomByHouseId(houseId);
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: data,
        })
        .end();
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorCode: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  getDetail: async (req: express.Request, res: express.Response) => {
    const { id } = req.body;
    try {
      const data = await getDetailRoom(id);
      console.log("🚀 ~ serviceHouse:", data);
      if (!data) {
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
          data: data,
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
  updateDetailById: async (req: express.Request, res: express.Response) => {
    const { id, prices, description } = req.body;

    try {
      const item = await getDetailRoom(id);
      if (!item) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      const newUpdate = await updateRoom(id, {
        prices: prices,
        description: description,
      });
      // ---- return
      return res
        .json({
          success: true,
          errorMessage: "",
          data: newUpdate,
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
  updateStatus: async (req: express.Request, res: express.Response) => {
    const { id, status } = req.body;
    try {
      const item = await getDetailRoom(id);
      if (!item) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      const newServiceHouse = await updateRoom(id, {
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

  // ----- delete
  deleteById: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.body;
      const item = await getDetailRoom(id);
      if (!item) {
        return res.status(403).json({
          success: false,
          errorMessage: "CANNOT_FIND_HOUSE_ID",
          data: null,
        });
      }
      await deleteRoom(id);
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
      await deleteAllRoom();
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
export default RoomController;

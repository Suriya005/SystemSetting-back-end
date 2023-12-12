const mongoose = require("mongoose");
const Type = require("../models/typeModel");
const Channel = require("../models/channelModel");

exports.getAllType = async (req, res) => {
  try {
    const msgType = await Type.find();
    res.json({ message: "success", status: 200, result: msgType });
  } catch (error) {
    res.json({ message: error.message, status: 500 });
  }
};

exports.getType = async (req, res) => {
  if (req.query.id == null || req.query.id == "") {
    res.json({ message: "Wrong data type.", status: 103 });
  } else {
    try {
      const msgType = await Type.findById(req.query.id);
      if (msgType == null) {
        res.json({ message: "Wrong data type.", status: 103 });
      } else {
        res.json({ message: "success", status: 200, result: msgType });
      }
    } catch (err) {
      res.json({ message: err.message, status: 500 });
    }
  }
};

exports.createType = async (req, res) => {
  try {
    if (
      req.body.name == null ||
      req.body.name == "" ||
      req.body.msgChannelId == null ||
      req.body.msgChannelId == "" ||
      req.body.status == null ||
      req.body.status == ""
    ) {
      res.json({ message: "Wrong data type.", status: 103 });
    } else {
      const channel = await Channel.findById(req.body.msgChannelId);
      if (channel == null || channel == "") {
        res.json({ message: "Wrong data type.", status: 103 });
      } else {
        const msgType = new Type(req.body);
        msgType._id = new mongoose.Types.ObjectId();
        await msgType.save();
        res.json({ message: "success", status: 200 });
      }
    }
  } catch (error) {
    if (error.code == 11000) {
      res.json({ message: "duplicata data", status: 202 });
    } else {
      res.json({ message: error.message, status: 500 });
    }
  }
};

exports.updateType = async (req, res) => {
  if (
    req.body.name == null ||
    req.body.name == "" ||
    req.body.msgChannelId == null ||
    req.body.msgChannelId == "" ||
    req.body.status == null ||
    req.body.status == ""
  ) {
    res.json({ message: "Wrong data type.", status: 103 });
  } else {
    try {
      const msgType = await Type.findById(req.query.id);
      if (msgType == null) {
        res.json({ message: "Wrong data type.", status: 103 });
      } else {
        msgType.name = req.body.name;
        msgType.msgChannelId = req.body.msgChannelId;
        msgType.status = req.body.status;
        await msgType.save();
        res.json({ message: "success", status: 200 });
      }
    } catch (error) {
      res.json({ message: error.message, status: 500 });
    }
  }
};

exports.deleteType = async (req, res) => {
  if (req.query.id == null || req.query.id == "") {
    res.json({ message: "Wrong data type.", status: 103 });
  } else {
    try {
      const msgType = await Type.findByIdAndDelete(req.query.id);
      if (msgType == null) {
        res.json({ message: "Wrong data type.", status: 103 });
      } else {
        res.json({ message: "success", status: 200 });
      }
    } catch (error) {
      res.json({ message: error.message, status: 500 });
    }
  }
};

import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { BlogModel } from '../models/BlogModel.js';
import { UserModel } from '../models/UserModal.js';
import dotenv from 'dotenv';
dotenv.config();
const userController = {
    // GET ALL USERS
    getAllUser: async(req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    // GET A USER
    getUser: async(req, res) => {
        try {
            const user = await UserModel.findById(req.params.id).populate('blogs');
            if (!user) {
                res.status(404).json('Không tìm thấy user');
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    // UPDATE USER
    updateUser: async(req, res) => {
        try {
            const newUser = req.body;
            const user = await UserModel.findByIdAndUpdate(req.params.id, newUser, { new: true });
            user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    // DELETE USER
    deleteUser: async(req, res) => {
        try {
            // https://localhost:5000/api/users/4382657643
            await BlogModel.updateMany({ author: req.params.id }, { author: null })
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) {
                res.status(404).json('User không tồn tại !')
            } else {
                res.status(200).json('Deleted successfully');
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    // FORGOT PASSWORD
    forgotPassword: async(req, res) => {
        try {
            const email = req.body.email;
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                res.status(404).json('Email không tồn tại');
            } else {
                // create reusable transporter object using the default SMTP transport
                let newPassword = Math.random().toString(36).substring(7);
                const salt = await bcrypt.genSalt(10);
                const hasded = await bcrypt.hash(newPassword, salt);
                const newUser = await UserModel.findOneAndUpdate({ email: email }, { password: hasded }, { new: true });
                await newUser.save();
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL, // generated ethereal user
                        pass: process.env.PASSWORD, // generated ethereal password
                    },
                    tls: { rejectUnauthorized: false }
                });
                var info = {
                    from: '', //Email người gửi
                    to: `${email}`, // Email người nhận
                    subject: 'LẤY LẠI MẬT KHẨU',
                    //text: 'Nội dung thư, không có code html'
                    html: `Cửa hàng Slyder.vn xin gửi lại mật khẩu của bạn. <br>
            Mật khẩu mới: <b style="padding: 5px 7px; background: #eee; color: red"> ${newPassword} </b>`, // Nội dung thư, có thể có code html
                };
                transporter.sendMail(info, (err) => {
                    if (err) {
                        res.status(500).json({ err: err })
                    } else {
                        res.status(200).json({ message: 'Mật khẩu mới đã gửi về email của bạn' });
                    }
                })
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    changePassword: async(req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            const password = user.password;
            const salt = await bcrypt.genSalt(10);
            const currentPassword = req.body.currentPassword;
            const validPassword = await bcrypt.compare(
                currentPassword,
                password
            );
            if (!validPassword) {
                res.status(404).json('Mật khẩu hiện tại không đúng !');
            } else {
                const comfirmPassword = req.body.comfirmPassword;
                const newPassword = req.body.newPassword;
                if (!(comfirmPassword === newPassword)) {
                    res.status(404).json('Mật khẩu nhập lại không khớp !');
                } else {
                    const hasded = await bcrypt.hash(newPassword, salt);
                    const newUser = await UserModel.findByIdAndUpdate(req.params.id, { password: hasded }, { new: true });
                    await newUser.save();
                    res.status(200).json(user);
                }
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
export default userController;
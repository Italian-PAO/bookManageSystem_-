package com.njxz.demo.controller;

import com.njxz.demo.domain.Vo.BorrowingBooksVo;
import com.njxz.demo.service.IBorrowingBooksRecordService;
import com.njxz.demo.utils.page.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
public class BorrowingController {

    @Resource
    private IBorrowingBooksRecordService borrowingBooksRecordService;
    /**
     * 返回所有用户借书记录页面
     * @return
     */
    @RequestMapping("/allBorrowBooksRecordPage")
    public String allBorrowingBooksRecordPage(Model model, @RequestParam("pageNum") int pageNum){
        Page<BorrowingBooksVo> page=borrowingBooksRecordService.selectAllByPage(pageNum);
        model.addAttribute("page",page);
        return "admin/allBorrowingBooksRecord";
    }

    @RequestMapping("/deleteBorrowingBook")
    @ResponseBody
    public String deleteBorrowingBook(@RequestParam("Id") int BorrowingId){
        int flag = borrowingBooksRecordService.deleteBorrowingRecord(BorrowingId);
        if(flag>0){
            return "true";
        }else{
            return "false";
        }
    }
}

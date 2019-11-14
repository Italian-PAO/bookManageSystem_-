package com.njxz.demo.controller;

import com.njxz.demo.domain.Book;
import com.njxz.demo.domain.BookCategory;
import com.njxz.demo.domain.Vo.BookVo;
import com.njxz.demo.service.IAdminService;
import com.njxz.demo.service.IBookCategoryService;
import com.njxz.demo.service.IBookService;
import com.njxz.demo.utils.page.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class BookController {
    @Resource
    private IAdminService adminService;
    @Resource
    private IBookService bookService;
    @Resource
    private IBookCategoryService bookCategoryService;
    /**
     * 管理员录入新书
     * @param book
     * @return
     */
    @RequestMapping("/addBook")
    @ResponseBody
    public String addBook(Book book){
        boolean res=adminService.addBook(book);
        if(res){
            return "true";
        }
        return "false";
    }

    /**
     * 返回查询书籍结果页
     * @param pageNum
     * @param model
     * @return
     */
    @RequestMapping("/showBooksResultPageByCategoryId")
    public String showBooksResultPageByCategoryId(@RequestParam("pageNum") int pageNum, @RequestParam("bookCategoryS") int bookCategory, @RequestParam("bookNameS") String bookName, @RequestParam("bookAuthorS") String bookAuthor, Model model){
        Page<BookVo> page=bookService.findBooksByCategoryId(bookCategory,bookName,bookAuthor,pageNum);
        model.addAttribute("page",page);

        return "admin/showBooks";
    }

    @RequestMapping("/showBooksResultPageByUser")
    public String showBooksResultPageByUser(@RequestParam("pageNum") int pageNum, @RequestParam("bookCategory") int bookCategory, @RequestParam("bookName") String bookName, @RequestParam("bookAuthor") String bookAuthor, Model model){
        Page<BookVo> page=bookService.findBooksByCategoryId(bookCategory,bookName,bookAuthor,pageNum);
        model.addAttribute("page",page);

        return "user/showBooks";
    }

    @RequestMapping("/showBooksResultPageByVisitor")
    public String showBooksResultPageByVisitor(@RequestParam("pageNum") int pageNum, @RequestParam("bookCategory") int bookCategory, @RequestParam("bookName") String bookName, @RequestParam("bookAuthor") String bookAuthor, Model model){
        Page<BookVo> page=bookService.findBooksByCategoryId(bookCategory,bookName,bookAuthor,pageNum);
        model.addAttribute("page",page);

        return "visitor/showBooks";
    }

    @RequestMapping("/userShowBooksPage")
    public String showBooksPage(Model model,@RequestParam("pageNum") int pageNum){
        Page<BookVo> page=bookService.findBooksByPage(pageNum);
        //page.setPageCount(1);
        page.setPageNum(1);
        model.addAttribute("page",page);
        return "user/showBooks";
    }

    /**
     * 查询所有书籍种类
     * @return
     */
    @RequestMapping("/findAllBookCategory")
    @ResponseBody
    public List<BookCategory> findAllBookCategory(){
        return adminService.getBookCategorys();
    }

    /**
     * 新建书籍种类
     * @param bookCategory
     * @return
     */
    @RequestMapping("/addBookCategory")
    @ResponseBody
    public String addBookCategory(BookCategory bookCategory){
        boolean b;
        try {
            b =adminService.addBookCategory(bookCategory);
        } catch (Exception e){
            b = false;
        }

        if(b){
            return "true";
        }
        return "false";
    }

    /**
     * 根据书籍种类id删除种类
     * @param bookCategoryId
     * @return
     */
    @RequestMapping("/deleteCategory")
    @ResponseBody
    public String deleteBookCategoryById(@RequestParam("bookCategoryId") int bookCategoryId){
        int res=bookCategoryService.deleteBookCategoryById(bookCategoryId);
        if(res>0){
            return "true";
        }
        return "false";
    }

    @RequestMapping("/deleteBook")
    @ResponseBody
    public String deleteBookById(@RequestParam("bookId") int bookId){
        int res=bookService.deleteBookById(bookId);
        if(res>0){
            return "true";
        }
        return "false";
    }

    @RequestMapping("/updateBook")
    @ResponseBody
    public String updateBookById(Book book){
        boolean res=bookService.updateBook(book);
        if(res){
            return "true";
        }
        return "false";
    }

    @RequestMapping("/updateBookCategory")
    @ResponseBody
    public String updateBookCategoryById(BookCategory bookCategory){
        boolean res=bookCategoryService.updateBookCategory(bookCategory);
        if(res){
            return "true";
        }
        return "false";
    }

}

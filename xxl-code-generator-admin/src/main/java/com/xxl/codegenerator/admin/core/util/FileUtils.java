package com.xxl.codegenerator.admin.core.util;

import com.xxl.codegenerator.admin.controller.IndexController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.CharBuffer;

/**
 * @Author: CipherCui
 * @Description:
 * @Date: Created in 17:27 2018/7/16
 */
public class FileUtils {

    private static final Logger logger = LoggerFactory.getLogger(FileUtils.class);

    /**
     * 功能描述: <br>
     * 将字符串写入指定路径的文件
     *
     * @param str
     * @param filePath
     */
    public static void writeFile(String str, String filePath) {
        FileOutputStream out = null;
        byte[] buff = str.getBytes();
        try {
            out = new FileOutputStream(filePath);
            out.write(buff, 0, buff.length);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException var2) {
                    throw new RuntimeException(var2);
                }
            }
        }
    }

    /**
     * 功能描述: <br>
     * 从指定路径的文件中读取字符串
     *
     * @param filePath
     * @return
     */
    public static String readFile(String filePath) {
        String str = null;
        CharBuffer cbuf = null;
        FileReader fReader = null;
        File file = new File(filePath);
        try {
            fReader = new FileReader(file);
            cbuf = CharBuffer.allocate((int) file.length());
            fReader.read(cbuf);
            str = new String(cbuf.array());
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (fReader != null) {
                try {
                    fReader.close();
                } catch (IOException var2) {
                    throw new RuntimeException(var2);
                }
            }
        }
        return str;
    }

}

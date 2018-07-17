package com.xxl.codegenerator.admin.core.util;

import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @Author: CipherCui
 * @Description:
 * @Date: Created in 17:27 2018/7/16
 */
public class FileUtils {

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

}

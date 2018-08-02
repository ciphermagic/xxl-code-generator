<#assign importDate = false />
<#assign importId = false />
<#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
    <#list classInfo.fieldList as fieldItem >
        <#if fieldItem.fieldClass == "Timestamp">
            <#assign importDate = true />
        </#if>
        <#if fieldItem.columnName == "id">
            <#assign importId = true />
        </#if>
    </#list>
</#if>
<#if importDate>
import java.sql.Timestamp;
</#if>
<#if importId>
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
</#if>
import com.tupperware.pos.domain.common.Base;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
*  ${classInfo.classComment}
*
*  Created by cipher on '${.now?string('yyyy-MM-dd HH:mm:ss')}'.
*/
@Table(name = "${classInfo.tableName}")
@ApiModel(value = "${classInfo.className}Model", description = "${classInfo.classComment}")
public class ${classInfo.className}Model extends Base {

    private static final long serialVersionUID = 1L;

<#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
<#list classInfo.fieldList as fieldItem >
    <#if fieldItem.columnName == "id" >
    @Id
    @GeneratedValue(generator = "JDBC")
    @ApiModelProperty("${fieldItem.fieldComment}")
    private Long id;

    </#if>
    <#if fieldItem.columnName != "id" >
    @ApiModelProperty(value = "${fieldItem.fieldComment}")
    private ${fieldItem.fieldClass} ${fieldItem.fieldName};

    </#if>
</#list>
</#if>
<#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
<#list classInfo.fieldList as fieldItem>
    public ${fieldItem.fieldClass} get${fieldItem.fieldName?cap_first}() {
        return ${fieldItem.fieldName};
    }

    public void set${fieldItem.fieldName?cap_first}(${fieldItem.fieldClass} ${fieldItem.fieldName}) {
        this.${fieldItem.fieldName} = ${fieldItem.fieldName};
    }

</#list>
</#if>

	public static class Builder {
	
		public Builder() {
		}
		
		private ${classInfo.className}Model po = new ${classInfo.className}Model();
		
		<#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
		<#list classInfo.fieldList as fieldItem>
		public Builder ${fieldItem.fieldName}(${fieldItem.fieldClass} ${fieldItem.fieldName}) {
			po.set${fieldItem.fieldName?cap_first}(${fieldItem.fieldName});
			return this;
		}
			
		</#list>
		</#if>
		
		public ${classInfo.className}Model build() {
			return po;
		}
	
	}
	
	public static Builder builder() {
		return new Builder();
	}
	
}
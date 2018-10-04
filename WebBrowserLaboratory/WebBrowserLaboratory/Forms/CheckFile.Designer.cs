namespace WebBrowserLaboratory.Forms
{
    partial class CheckFile
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.runButton = new System.Windows.Forms.Button();
            this.demoLabe = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // runButton
            // 
            this.runButton.Location = new System.Drawing.Point(143, 75);
            this.runButton.Name = "runButton";
            this.runButton.Size = new System.Drawing.Size(75, 23);
            this.runButton.TabIndex = 0;
            this.runButton.Text = "Run";
            this.runButton.UseVisualStyleBackColor = true;
            this.runButton.Click += new System.EventHandler(this.RunButton_Click);
            // 
            // demoLabe
            // 
            this.demoLabe.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.demoLabe.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.demoLabe.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.demoLabe.Location = new System.Drawing.Point(12, 9);
            this.demoLabe.Name = "demoLabe";
            this.demoLabe.Size = new System.Drawing.Size(336, 44);
            this.demoLabe.TabIndex = 2;
            this.demoLabe.Text = "A demo on how to check file.";
            this.demoLabe.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // CheckFile Form
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(360, 114);
            this.Controls.Add(this.demoLabe);
            this.Controls.Add(this.runButton);
            this.Name = "CheckFile";
            this.Text = "CheckFile";
            this.ResumeLayout(false);
        }

        #endregion

        private System.Windows.Forms.Button runButton;
        private System.Windows.Forms.Label demoLabe;
    }
}